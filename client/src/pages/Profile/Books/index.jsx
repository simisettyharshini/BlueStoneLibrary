import React ,{useEffect,useState}from 'react';
import Button from '../../../components/Button';
import BookForm from "./BookForm.jsx"
import {GetAllBooks, DeleteBook} from '../../../apicalls/books';
import moment from "moment";
import {useDispatch} from "react-redux"
import { message } from 'antd';
import {ShowLoading, HideLoading}from "../../../redux/loadersSlice";
import {Table} from 'antd';
import Issues from "./Issues.jsx";
import IssueForm from "./IssueForm.jsx";


function Books() {
    const [formType,setFormType] = useState('add')
    const [selectedBook,setSelectedBook] = useState(null)
    const [openBookForm,setOpenBookForm] = React.useState(false);
    const [openIssues, setOpenIssues] = React.useState(false);
    const [openIssuesForm, setOpenIssuesForm] = React.useState(false);
    const [books,setBooks] = React.useState([]);
    const  dispatch = useDispatch();
     

    const getBooks = async() =>{
        try {
            dispatch(ShowLoading());
            const response = await GetAllBooks();
            dispatch(HideLoading());
            if(response.success){
                setBooks(response.data);
            }else{
                message.error(response.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    useEffect(()=>{
          getBooks()
    },[]);
   
    // Delete Book 
    const deleteBook = async(id) => {
        try{
            dispatch(ShowLoading())
            const response = await DeleteBook(id);
            dispatch(HideLoading());
            if(response.success){
                message.success(response.message);
                getBooks();
            }else{
                message.error(response.message);
            }    
            
        }catch(error){
            dispatch(HideLoading());
            message.error(error.message);
        }
    };


// Displaying all the added books
    const columns = [
        {
        title: "Book",
        dataIndex: "image",
        render:(image) => <img src={image} alt="book" width="120" height="100"/>
       },
       
       {
        title:"Title",
        dataIndex: "title",
       },
       
       {
        title:"Category",
        dataIndex: "category",
       },
       {
        title:"Author",
        dataIndex:"author"
       },
       {
        title:"Publisher",
        dataIndex:"publisher"
       },
       {
        title:"Added On",
        dataIndex: "createdAt",
        render:(date) => moment(date).format("DD-MM-YYYY  hh:mm:ss A"),
       },
       {
        title:"Total Copies",
        dataIndex:"totalCopies",
       },
       {
        title:"Available Copies",
        dataIndex:"availableCopies",
       },
       {
        title:"Action",
        dataIndex:"action",
        render:(text,record) =>(
            <div className="flex gap-1">
               <i className="ri-edit-fill" 
                 onClick= {() => {
                    setFormType("edit");
                    setSelectedBook(record);
                    setOpenBookForm(true);
                }
                }
                ></i>
               <i class="ri-delete-bin-fill"
                 onClick = {() =>deleteBook(record._id)}> </i>

                 <span className="underline"
                  onClick ={()=>{
                    setOpenIssues(true);
                    setSelectedBook(record);
                  }}>Issues</span>
                  
                 <span className="underline"
                  onClick ={()=>{
                    setOpenIssuesForm(true);
                    setSelectedBook(record);
                  }}>Issue Book</span>
                  

           </div>
        ),
       },
];
    return (<div>
        <div className="flex justify-end">
            <Button title="Add Book"
            onClick={() => {
                setFormType("add");
                setSelectedBook(null);
                setOpenBookForm(true)}}
                />
        </div>

        <Table columns ={columns} dataSource={books} className="mt-1"/>
        {openBookForm && (<BookForm open= {openBookForm} setOpen = {setOpenBookForm}
        reloadBooks={getBooks}
        formType = {formType}
        selectedBook = {selectedBook}
        setSelectedBook = {setSelectedBook}        
        
        />
        )}
        {openIssues && (
            <Issues
              open={openIssues}
              setOpen={setOpenIssues}
              selectedBook = {selectedBook}
              setSelectedBook = {setSelectedBook}
              reloadBooks={getBooks}/>
        )}
       
        {openIssuesForm && (
            <IssueForm
              open={openIssuesForm}
              setOpen={setOpenIssuesForm}
              selectedBook = {selectedBook}
              setSelectedBook = {setSelectedBook}
              getData={getBooks}
              type="add"/>
        )}
       

    </div>
    );

}

export default Books
