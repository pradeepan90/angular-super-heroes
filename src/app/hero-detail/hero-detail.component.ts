import { Component, OnInit, Input } from "@angular/core";
import { Hero } from "../hero";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { Location } from "@angular/common";
import { HeroService } from "../hero.service";

@Component({
  selector: "app-hero-detail",
  templateUrl: "./hero-detail.component.html",
  styleUrls: ["./hero-detail.component.css"]
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private router: Router
  ) {}
  public heroId;
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get("id"));
      this.heroId = id;
    });
    this.getHero();
  }
  getHero(id: number = this.heroId): void {
    // const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero => (this.hero = hero))
   
  }
  save(): void {
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }
  goBack(): void {
    this.location.back();
  }
  goNext(): void {
    let nextId = this.heroId + 1;
    this.router.navigate(["/detail", nextId]);
    this.getHero(nextId);
  }
  goPrev(): void {
    let prevId = this.heroId - 1;
    this.router.navigate(["/detail", prevId]);
    this.getHero(prevId);
  }
}
