
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <>
      
          

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Panel de Control</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <button type="button" className="btn btn-sm btn-outline-secondary">
                    Compartir
                  </button>
                  <button type="button" className="btn btn-sm btn-outline-secondary">
                    Exportar
                  </button>
                </div>
                {/* <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                        <span data-feather="calendar" className="align-text-bottom"></span>
                        This week
                    </button> */}
              </div>
            </div>

            {/* <canvas className="my-4 w-100" id="myChart" width="900" height="380"></canvas> */}

            
          </main>
        
    </>
  );
};

export default Dashboard;
