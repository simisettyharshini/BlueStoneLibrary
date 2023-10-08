import React, {useEffect, useState} from 'react';
import {message, Modal, Table} from 'antd'
import {useDispatch} from 'react-redux';
import {GetIssues} from '../../../apicalls/issues';
import {HideLoading, ShowLoading} from '../../../redux/loadersSlice';
import moment from 'moment';
// import Button from '../../../components/Button';

function IssuedBooks({showIssuedBooks, setShowIssuedBooks, selectedUser}) {
    const [issuedBooks, setIssuedBooks] = React.useState([]);
    const dispatch = useDispatch();
    const getIssues = async () => {
        try {
            dispatch(ShowLoading());
            const response = await GetIssues({user: selectedUser._id});
            dispatch(HideLoading());
            if (response.success) {
                setIssuedBooks(response.data);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message)
        }
    };
    useEffect(() => {
        getIssues();
    }, []);

    const columns = [
        {
            title: "Id",
            dataIndex: "_id"

        },
        {
            title: "Book ",
            dataIndex: "book",
            render:(book) => book?.title
        },
        {
            title: "Issued Date",
            dataIndex: "issuedDate",
            render: (issuedDate) => moment(issuedDate).format("DD-MM-YYYY   hh:mm A")
        },
        {
            title: "Return Date",
            dataIndex: "returnDate",
            render: (returnDate) => moment(returnDate).format("DD-MM-YYYY   hh:mm A")
        }, {
            title: "Rent",
            dataIndex: "rent"
        }, {
            title: "Fine",
            dataIndex: "fine"
        }, {
            title: "Returned On",
            dataIndex: "returnedDate",
            render: (returnedDate) => {
                if (returnedDate) {
                    return moment(returnedDate).format("DD-MM-YYYY   hh:mm  A");
                } else {
                    return "Not Returned Yet";
                }
            }
        }


    ];



    return (

        <Modal open={showIssuedBooks}
            onCancel={
                () => setShowIssuedBooks(false)
            }

            footer={null}
            width={1400}>

            <h1 className="text-primary text-xl text-center font-bold uppercase">
                {
                selectedUser.name
            }'s Issued Books
            </h1>
              <Table columns={columns} dataSource={issuedBooks}/>
              
              
        </Modal>
    )
}

export default IssuedBooks
