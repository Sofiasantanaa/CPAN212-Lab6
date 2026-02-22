import { Component, OnInit } from '@angular/core';
import { ClientApiService } from '../../services/client-api.service';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html'
})
export class ClientsPageComponent implements OnInit {
  clients: Client[] = [];
  loading = false;
  error: string | null = null;

  riskCategory = '';
  q = '';

  constructor(private api: ClientApiService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = null;

    this.api.list({
      riskCategory: this.riskCategory || undefined,
      q: this.q || undefined
    }).subscribe({
      next: (rows) => {
        this.clients = rows;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message ?? 'Failed to load clients';
        this.loading = false;
      }
    });
  }

  badgeClass(risk: Client['riskCategory']): string {
    if (risk === 'Low') return 'badge-risk-low';
    if (risk === 'High') return 'badge-risk-high';
    return 'badge-risk-medium';
  }

  remove(client: Client): void {
    if (!client._id) return;
    const ok = confirm(`Delete client ${client.fullName}?`);
    if (!ok) return;

    this.api.remove(client._id).subscribe({
      next: () => this.load(),
      error: (err) => {
        this.error = err?.error?.message ?? 'Failed to delete client';
      }
    });
  }
}
