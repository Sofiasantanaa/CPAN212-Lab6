import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientApiService } from '../../services/client-api.service';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-client-form-page',
  templateUrl: './client-form-page.component.html'
})
export class ClientFormPageComponent implements OnInit {
  mode: 'create' | 'edit' = 'create';
  clientId: string | null = null;

  loading = false;
  saving = false;
  error: string | null = null;

  form = this.fb.group({
    clientRef: ['', [Validators.required, Validators.maxLength(30)]],
    fullName: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.maxLength(40)]],
    riskCategory: ['Medium' as Client['riskCategory'], [Validators.required]],
    classification: ['Standard', [Validators.required, Validators.maxLength(50)]],
    advisor: ['', [Validators.required, Validators.maxLength(80)]],
    notes: ['']
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private api: ClientApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mode = 'edit';
      this.clientId = id;
      this.loadClient(id);
    }
  }

  private loadClient(id: string): void {
    this.loading = true;
    this.api.get(id).subscribe({
      next: (c) => {
        this.form.patchValue({
          clientRef: c.clientRef,
          fullName: c.fullName,
          email: c.email,
          phone: c.phone,
          riskCategory: c.riskCategory,
          classification: c.classification,
          advisor: c.advisor,
          notes: c.notes || ''
        });
        // Keep clientRef editable? If you want it immutable, disable here.
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message ?? 'Failed to load client';
        this.loading = false;
      }
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.error = null;

    const payload = this.form.getRawValue() as Client;

    if (this.mode === 'create') {
      this.api.create(payload).subscribe({
        next: (created) => {
          this.saving = false;
          this.router.navigate(['/clients', created._id]);
        },
        error: (err) => {
          this.error = err?.error?.message ?? 'Failed to create client';
          this.saving = false;
        }
      });
    } else {
      if (!this.clientId) return;
      this.api.update(this.clientId, payload).subscribe({
        next: (updated) => {
          this.saving = false;
          this.router.navigate(['/clients', updated._id]);
        },
        error: (err) => {
          this.error = err?.error?.message ?? 'Failed to update client';
          this.saving = false;
        }
      });
    }
  }
}
