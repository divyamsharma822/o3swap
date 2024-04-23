import { Row } from 'react-bootstrap';
import Sidebar from '../../sidebar';
import AdminHeader from '../adminHeader/AdminHeader';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="admin-dashaboard">
            <Row className="m-0">
                <Sidebar />
                <div className="admin-dashboard-right">
                    <div className="main-header">
                        <AdminHeader />
                    </div>
                    <div className="admin-right-main">
                        <Outlet />
                    </div>
                </div>
            </Row>
        </div>
    );
};

export default Dashboard;
