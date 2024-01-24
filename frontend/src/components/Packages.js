import React from "react";



function Plans(){

    return(
        <div className="plans-container">

                <div className="plans-header">
                    <span> Service packages </span>
                </div>

                <div className="plans">

                    <div className="plan">
                        <img src="" alt="" />
                        <span> plan name 1</span>
                        <span>$ price</span>

                        <div className="details">
                            <div className="feature">
                                <img src="" alt="" />
                                <span> feature1</span> <br/>
                                <span> feature2</span>
                            </div>
                        </div>

                        <span>see more benefits</span>
                        <button className="btn"> Button </button>
                    </div>

                    <div className="plan">
                        <img src="" alt="" />
                        <span> plan name 2</span>
                        <span>$ price</span>

                        <div className="details">
                            <div className="feature">
                                <img src="" alt="" />
                                <span> feature1</span><br/>
                                <span> feature2</span>
                            </div>
                        </div>

                        <span>see more benefits</span>
                        <button className="btn"> Button </button>
                    </div>

                    <div className="plan">
                        <img src="" alt="" />
                        <span> plan name 3</span>
                        <span>$ price</span>

                        <div className="details">
                            <div className="feature">
                                <img src="" alt="" />
                                <span> feature1</span><br/>
                                <span> feature2</span>
                            </div>
                        </div>

                        <span>see more benefits</span>
                        <button className="btn"> Button </button>
                    </div>

                </div>
        </div>

    )
}

export default Plans;