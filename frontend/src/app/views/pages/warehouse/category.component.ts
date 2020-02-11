import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { finalize } from 'rxjs/operators';
declare const $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {
  category: Category = {};
  categories: Category[] = [];
  update: boolean;
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getAllCategories();
  }

  createCAtegory() {
    this.categoryService.createCategory(this.category)
      .pipe(finalize(() => {
        this.cleanCategory();
        this.getAllCategories();
      }))
      .subscribe(
        (data: Category) => console.log(data),
        (error) => console.error(error));
  }

  updateCategory() {
    this.categoryService.updateCAtegory(this.category)
      .pipe(finalize(() => {
        this.update = false;
        this.cleanCategory();
      }))
      .subscribe(
        (data: Category) => console.log('update', data),
        (error) => console.error(error));
  }

  getAllCategories() {
    this.categoryService.getCategory()
      .subscribe(
        (data: Category[]) => this.categories = data,
        (error) => console.error(error));
  }

  btnEditCategory(model: Category) {
    this.update = true;
    $('#myCard').CardWidget('expand');
    $('#text').focus();
    this.category = model;
  }

  cleanCategory() {
    this.update = false;
    this.category = new Category();
  }

}
