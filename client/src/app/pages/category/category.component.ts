import { Category } from './../../core/models/category';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from './../../core/services/common.service';
import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit, OnChanges {
  public selectedCar: number | undefined;

  cars = [
    { id: 1, name: 'Trending' },
    { id: 2, name: 'Newest' },
  ];

  academicesPath = '/communities/get/academics';
  slug!: string;
  searchQuery!: string;

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService
  ) {}
  isLoader = false;
  get categories() {
    return this.commonService.categories();
  }
  get title() {
    return this.categories.find((e) => e.slug == this.slug);
  }
  ngOnChanges() {}
  ngOnInit(): void {
    this.route.params.subscribe((res) => {
      this.slug = res['slug'];
    });
  }
}
