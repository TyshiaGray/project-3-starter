import React from "react";
import MyCalendar from "../../components/MyCalendar";


function Member() {
    return (
        <div>
            <button type="button" className="btn btn-primary">Add New Bill</button>
        
            <MyCalendar />
        </div>
    )
}

export default Member;