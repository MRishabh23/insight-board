import React from 'react'
import SummaryForm from './summary-form';

const MainSummaryComponent = ({...props}) => {
    return (
        <div className="flex flex-col">
          summary goes here...
          <SummaryForm/>
        </div>
      );
}

export default MainSummaryComponent