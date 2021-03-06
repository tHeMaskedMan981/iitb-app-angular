import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { IEvent } from '../interfaces';
import { DataService } from '../data.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Helpers } from '../helpers';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnChanges, OnInit {

  @Input() public eventId: string;
  @Input() public noCenter = false;
  @Output() public load = new EventEmitter<boolean>();

  public event: IEvent;
  public shareShowing = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    public dataService: DataService,
    public router: Router,
  ) {}

  /** Refresh the component whenever passed eventId changes */
  ngOnChanges() {
    this.refresh();
  }

  /** Check if called with a url and update */
  ngOnInit() {
    if (!this.eventId) {
      this.activatedRoute.params.subscribe((params: Params) => {
        this.eventId = params['id'];
        this.refresh();
      });
    }
  }

  /** Call the events API and show data */
  refresh() {
    this.dataService.FillGetEvent(this.eventId).subscribe(result => {
      this.event = result;
      this.load.emit(true);
    }, () => {
      this.load.emit(false);
    });
  }

  /** Helper for marking UserEventStatus */
  markUES(already: boolean, status: number, e) {
    if (already && !e.checked) {
      status = 0;
    }
    this.dataService.MarkUES(this.event, status).subscribe();
  }

  /** Navigate back to feed (should be changed to last page) */
  closeEventDetails() {
    this.dataService.navigateBack();
  }

  share() {
    if (!Helpers.NativeShare(this.event.name, `Check out ${this.event.name} at InstiApp!`, this.shareUrl())) {
      this.shareShowing = !this.shareShowing;
    }
  }

  /** Get the sharing url */
  shareUrl(): string {
    return environment.host + 'event/' + this.event.str_id;
  }

  openEventEdit() {
    this.router.navigate(['edit-event', this.event.id]);
  }

}
