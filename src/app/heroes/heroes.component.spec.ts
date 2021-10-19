import { of } from 'rxjs';
import { HeroesComponent } from './heroes.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HeroService } from '../hero.service';

describe('HeroesComponent', () => {
	let component: HeroesComponent;
	let HEROES;
	let mockHeroService;

	beforeEach(() => {
		HEROES = [
			{ id: 1, name: 'SpiderDude', strength: 8 },
			{ id: 2, name: 'Wonderful Woman', strength: 24 },
			{ id: 3, name: 'SuperDude', strength: 55 },
		];

		mockHeroService = jasmine.createSpyObj([
			'getHeroes',
			'addHero',
			'deleteHero',
		]);

		component = new HeroesComponent(mockHeroService);
	});

	describe('delete', () => {
		it('should remove the indicated hero from list', () => {
			mockHeroService.deleteHero.and.returnValue(of(true));
			component.heroes = HEROES;
			component.delete(HEROES[2]);
			expect(component.heroes.length).toBe(2);
		});

		it('should call deleteHero', () => {
			mockHeroService.deleteHero.and.returnValue(of(true));
			component.heroes = HEROES;
			component.delete(HEROES[2]);
			expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
		});
	});

	describe('HeroSearchComponent', () => {
		let fixture: ComponentFixture<HeroesComponent>;
		beforeEach(() => {
			TestBed.configureTestingModule({
				declarations: [HeroesComponent],
				providers: [{ provide: HeroService, useValue: mockHeroService }],
				schemas: [NO_ERRORS_SCHEMA],
			});
			fixture = TestBed.createComponent(HeroesComponent);

			it('should set heroes correctly from the service', () => {
				mockHeroService.getHeroes.and.returnValue(of(HEROES));
				fixture.detectChanges();

				expect(fixture.componentInstance.heroes.length).toBe(3);
			});
		});
	});
});
