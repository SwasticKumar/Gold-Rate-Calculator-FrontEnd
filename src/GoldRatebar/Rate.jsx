
import React from "react";
import "./Rate.css";

function Rate() {

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <span className="test">
             
                  <div key={i} className="flip-card ">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <form className="d-flex justify-content-center align-item-center mt-3">
                          <h4 className="odd">24k</h4>
                          <br />
                          <small className="odd">Gold Today Rate</small>
                        </form>
                      </div>
                      <div className="flip-card-back">
                        <h3
                          className={`mt-3 d-flex justify-content-center ${item.Text}`}
                        >
                          5969
                        </h3>
                      </div>
                    </div>
                  </div>
            
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Rate;
