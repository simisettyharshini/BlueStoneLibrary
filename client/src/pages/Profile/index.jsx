import React from "react";
import { Tabs } from "antd";
import Books from "./Books";
import Users from "./Users";
import Reports from "./Reports";
import { useSelector } from "react-redux";
import BasicDetails from "./BasicDetails";
import BorrowedBooks from "./BorrowedBooks";
import BookDetails from "./BookDetails";
const TabPane = Tabs.TabPane;

function Profile() {
  const { user } = useSelector((state) => state.users);
  const role = user.role;

  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="General" key="1">
          <BasicDetails />
        </TabPane>

        {role === "patron" && (
             <TabPane tab="Books Borrowed" key="2">
             <BorrowedBooks />
           </TabPane>
        )}

            {role === "patron" && (
             <TabPane tab="Rating And Review" key="3">
             <BookDetails/>
           </TabPane>
        )}

        {role !== "patron" && (
          <TabPane tab="Books" key="4">
            <Books />
          </TabPane>
        )}
        {role !== "patron" && (
          <TabPane tab="Patrons" key="5">
            <Users role="patron" />
          </TabPane>
        )}
        {role === "admin" && (
          <TabPane tab="Librarians" key="6">
            <Users role="librarian" />
          </TabPane>
        )}
        {role === "admin" && (
          <TabPane tab="Admins" key="7">
            <Users role="admin" />
          </TabPane>
        )}
        {role === "admin" && (
          <TabPane tab="Reports" key="8">
            <Reports />
          </TabPane>
        )}
      </Tabs>
    </div>
  );
}

export default Profile;