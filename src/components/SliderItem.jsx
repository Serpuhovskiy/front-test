import React from 'react';
import cn from 'classnames';
import '../scss/SliderItem.scss'

function SliderItem({ name, company, onClick, active }) {
  return (
    <div
      className="slider__list-item"
      onClick={() => {
        onClick();
      }}>
      <img src="https://i.pravatar.cc/290" alt="" className={cn('slider__item-img', active === name ? 'slider__item-img_active' : '')} />
      <h4 className={cn('slider__item-initials', active === name ? 'slider__item-initials_active' : '')}>{name}</h4>
      <p className={cn('slider__item-company', active === name ? 'slider__item-company_active' : '')}>{company.name}</p>
    </div>
  );
}

export default SliderItem;
