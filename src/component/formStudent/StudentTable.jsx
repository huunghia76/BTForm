import React, { useState } from 'react'
import Input from '../input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { BTFormAction } from '../../store/formStudent/slice';
import swal from 'sweetalert';
const StudentTable = () => {
    const { studentList } = useSelector(state => state.BTFormStudent)
    const dispatch = useDispatch()
    const [inputSearchValue, setInputSearchValue] = useState()

    const studentSearch = studentList.filter((item) =>
        item.hoTen?.toLowerCase().includes(inputSearchValue?.toLowerCase()
        ))

    return (
        <div className='mt-3'>
            <div className=''>
                <Input
                    type="text"
                    placeholder="Search with name.."
                    value={inputSearchValue || ''}
                    onChange={(e) => {
                        setInputSearchValue(e.target.value)
                    }}
                ></Input>

            </div>
            <table className=" table  ">
                <thead className='table-dark'>
                    <tr>
                        <th>#</th>
                        <th>Mã SV</th>
                        <th>Họ tên </th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (inputSearchValue ? studentSearch : studentList).map((item, key) => (
                            <tr key={item.maSV}>
                                <td>{key + 1}</td>
                                <td>{item.maSV}</td>
                                <td>{item.hoTen}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.email}</td>
                                <td>
                                    <button onClick={() => {
                                        dispatch(BTFormAction.editStudent(item))
                                    }} className='btn btn-info me-2'>Edit</button>

                                    <button onClick={() => {
                                        swal({
                                            title: "Bạn chắc chứ?",
                                            text: "Bạn có chắc là muốn xóa sinh viên này không?",
                                            icon: "warning",
                                            dangerMode: true,
                                        })
                                            .then(willDelete => {
                                                if (willDelete) {
                                                    dispatch(BTFormAction.deleteStudent(item.maSV))
                                                    swal("Deleted!", "Sinh viên đã được xóa khỏi danh sách!", "success");
                                                }
                                            });

                                    }} className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}

export default StudentTable