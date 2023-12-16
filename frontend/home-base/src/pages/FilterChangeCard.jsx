
function FilterChangeCard(){
    return(
        <div class="card" style={{width: '18rem'}}>
  <img></img>
 

 {/* TO-DO Fix the sample text to pull data */}
 {/* TO-DO Import Card into app.jsx & configure routing */}
  <div className="card-body">
    <h5 className="card-title">Equipment Name</h5>
    <h6 className="card-subtitle mb-2 text-muted">Equipment Location</h6>
    <p className="card-text">Filter Size</p>
    <p className="card-text">Due Date</p>
    <button type="button" class="btn">Change Now</button>
  </div>
</div>

    );

}

export default FilterChangeCard