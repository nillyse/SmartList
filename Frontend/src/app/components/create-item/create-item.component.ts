import { Component } from '@angular/core';
import { Category } from 'app/models/category';
import { CategoryService } from 'app/services/category/category.service';
import { OperatorFunction, Observable, debounceTime, distinctUntilChanged, map, Subject, takeUntil } from 'rxjs';

const categories = [
	'Alabama',
	'Alaska',
	'American Samoa',
	'Arizona',
	'Arkansas',
	'California',
	'Colorado',
	'Connecticut',
	'Delaware',
	'District Of Columbia',
	'Federated States Of Micronesia',
	'Florida',
	'Georgia',
	'Guam',
	'Hawaii',
	'Idaho',
	'Illinois',
	'Indiana',
	'Iowa',
	'Kansas',
	'Kentucky',
	'Louisiana',
	'Maine',
	'Marshall Islands',
	'Maryland',
	'Massachusetts',
	'Michigan',
	'Minnesota',
	'Mississippi',
	'Missouri',
	'Montana',
	'Nebraska',
	'Nevada',
	'New Hampshire',
	'New Jersey',
	'New Mexico',
	'New York',
	'North Carolina',
	'North Dakota',
	'Northern Mariana Islands',
	'Ohio',
	'Oklahoma',
	'Oregon',
	'Palau',
	'Pennsylvania',
	'Puerto Rico',
	'Rhode Island',
	'South Carolina',
	'South Dakota',
	'Tennessee',
	'Texas',
	'Utah',
	'Vermont',
	'Virgin Islands',
	'Virginia',
	'Washington',
	'West Virginia',
	'Wisconsin',
	'Wyoming',
];


@Component({
	selector: 'app-create-item',
	templateUrl: './create-item.component.html',
	styleUrls: ['./create-item.component.less']
})
export class CreateItemComponent {

	destroy$: Subject<boolean> = new Subject<boolean>();
	categoryList: Array<Category> = [];


	constructor(private categoryService: CategoryService) {
	}

	ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.unsubscribe(); 
		}
	
	  ngOnInit() {
		this.getCategories();
	  }
	

	search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
			distinctUntilChanged(),
			map((term) =>
				term === '' ? [] : this.categoryList.map(c => c.name).filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
			),
		);

	getCategories() {
		this.categoryService.getCategories()
			.pipe(takeUntil(this.destroy$))
			.subscribe((response => {
				this.categoryList = response.data;
			}));
	}

}
