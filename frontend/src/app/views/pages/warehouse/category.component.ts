import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {
  category: Category = {};
  categories: Category[] = [];
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getAllCategories();
  }

  createCAtegory() {
    this.categoryService.createCategory(this.category)
      .subscribe(
        (data: Category) => console.log(data),
        (error) => console.error(error));
  }

  getAllCategories() {
    this.categoryService.getCategory()
      .subscribe(
        (data: Category[]) => this.categories = data,
        (error) => console.error(error));
  }

}
