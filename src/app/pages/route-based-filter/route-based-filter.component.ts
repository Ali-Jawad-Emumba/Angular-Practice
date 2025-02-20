import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../../utils/services/main.service';

@Component({
  selector: 'app-route-based-filter',
  imports: [CommonModule],
  templateUrl: './route-based-filter.component.html',
  styleUrl: './route-based-filter.component.css',
})
export class RouteBasedFilterComponent implements OnInit {
  properties: any = [];
  constructor(private route: ActivatedRoute, public mainService: MainService) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      console.log(param);
      let result = this.mainService.properties;
      if (param['city']) {
        result = result.filter(
          (property) => property.city.replace(/ /, '-') === param['city']
        );
      }
      if (param['type']) {
        result = result.filter((property) => property.type === param['type']);
      }
      if (param['price']) {
        result = result.filter((property) => property.price === param['price']);
      }
      this.properties = result;
    });
  }
}
