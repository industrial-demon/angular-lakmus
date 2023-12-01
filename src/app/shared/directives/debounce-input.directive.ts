import { Directive, HostListener } from "@angular/core";
import { AbstractDebounceDirective } from "./abstract-debounce.directive";

@Directive({
  selector: "[debounceInput]"
})
export class DebounceInputDirective extends AbstractDebounceDirective {
  constructor() {
    super();
  }

  @HostListener("input", ["$event"])
  public onInput(event: any): void {
    event.preventDefault();
    this.emitEvent$.next(event);
  }
}
