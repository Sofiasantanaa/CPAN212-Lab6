import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientApiService } from '../../services/client-api.service';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-client-details-page',
  templateUrl: './client-details-page.component.html'
})
export class ClientDetailsPageComponent implements OnInit {
  client: Client | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ClientApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'Missing client id';
      return;
    }

    this.loading = true;
    this.api.get(id).subscribe({
      next: (c) => {
        this.client = c;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message ?? 'Client not found';
        this.loading = false;
      }
    });
  }

  badgeClass(risk: Client['riskCategory']): string {
    if (risk === 'Low') return 'badge-risk-low';
    if (risk === 'High') return 'badge-risk-high';
    return 'badge-risk-medium';
  }

  remove(): void {
    if (!this.client?._id) return;
    const ok = confirm(`Delete client ${this.client.fullName}?`);
    if (!ok) return;

    this.api.remove(this.client._id).subscribe({
      next: () => this.router.navigate(['/clients']),
      error: (err) => {
        this.error = err?.error?.message ?? 'Failed to delete client';
      }
    });
  }
}
