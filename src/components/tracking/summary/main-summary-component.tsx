import React from 'react'
import SummaryForm from './summary-form';
import { SummaryTable } from './summary-table';

const MainSummaryComponent = ({...props}) => {
    return (
        <div className="flex flex-col">
          <SummaryForm params={props.params}/>
          <SummaryTable params={props.params} username={props.username}/>
        </div>
      );
}

export default MainSummaryComponent