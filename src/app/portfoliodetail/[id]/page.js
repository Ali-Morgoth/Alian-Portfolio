'use client';
import React from 'react';
import PortfolioDetailDesign from '../../page/portfolio-detail-design';
import { DataArray } from '@/app/data';
import "../../globals.css"

const Portfolio = (props) => {
  const project = DataArray[props.params.id];

  return (
    <React.Fragment>
 
      <PortfolioDetailDesign
        data={project}
        id={props.params.id}
        DataArray={DataArray}
      />

     

  </React.Fragment>
  );
};

export default Portfolio;
