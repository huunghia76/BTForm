import React, { useEffect, useState } from 'react'
import Input from '../input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { BTFormAction } from '../../store/formStudent/slice';

const StudentForm = () => {
    const {studentList, studentEdit}= useSelector(state => state.BTFormStudent)

    const dispatch = useDispatch()
    const [formValue, setFormValue] = useState()
    const [formError, setFormError] = useState()
    //currying function
    const handleFormValue = () => (ev) => {
        const { name, value } = ev.target
        let mess = validate(ev.target)
        
        setFormError({
            ...formError,
            [name]: mess,
        })
        setFormValue({
                ...formValue,
                [name]: value,
        })
    }
    const validate = (element) => {
        let mess = ''
        const { validity, minLength, title , value , name, disabled } = element
        if (!disabled) {
            if (name === 'maSV') {
                studentList.forEach((item) => {
                    if (value === item.maSV) {
                        mess = "Mã Sinh viên đã tồn tại"
                    }
                })
            }
        }
        const { valueMissing, tooShort , patternMismatch } = validity

      

        if (valueMissing) {
            mess = `Vui lòng nhập ${title}`
        } else if (tooShort || value.length < minLength) {
            mess = `Vui lòng nhập ${title} tối thiểu ${minLength} ký tự`
        } else if (patternMismatch) {
            mess = `Vui lòng nhập đúng ${title}`
        }
        return mess
    }

    useEffect(()=>{
        if (!studentEdit) return

        setFormValue(studentEdit)
    },[studentEdit])// nếu studentEdit thay đổi thì gọi callback hàm useEffect


    return (
        <div>
            <div >
                <div className=''>
                    <h2 className='text-white bg-dark py-3 ps-2'>Thông tin sinh viên</h2>
                    <form 
                    noValidate//hủy validate tự động của browser
                    onSubmit={(ev) => {
                    // Ngăn chặn sự kiện reload của browser khi submit form
                    ev.preventDefault()


                    const ele = document.querySelectorAll('form input')
                    // console.log("ele: ", ele);
                    let errors = {}
                    ele.forEach(el => {
                        const { name } = el
                            let mess = validate(el)
                            errors[name] = mess
                            setFormError(errors)
                    })
                    

                    
                    // check value đầu vào 
                    let isFlag = false
                    for(let key in errors){//nếu form error có lỗi break 
                        if(errors[key]){
                            isFlag = true
                            break
                        }
                    }
                    // nếu ko có lỗi thì return về giá trị
                    if(isFlag) return
                    
                    if(!studentEdit){
                        // create product
                        dispatch(BTFormAction.addStudent(formValue))
                    }else{
                        // update
                        dispatch(BTFormAction.updateStudent(formValue))
                    }
                    // console.log('submit')
                }}
                    >
                        <div className="row row-cols-2">
                            <div className="col">
                                <Input
                                    name="maSV"
                                    label="Mã SV"
                                    title="Mã SV"
                                    disabled={!!studentEdit}
                                    type="text"
                                    value={formValue?.maSV || ''}
                                    onChange={handleFormValue()}
                                    required
                                    minLength={5}
                                    maxLength={8}
                                    autoComplete="off"
                                />
                                {formError?.maSV && <p className='text-danger'>{formError?.maSV}</p>} 
                            </div>
                            <div className="col">
                                <Input
                                    name="hoTen"
                                    title="Họ tên"
                                    label="Họ tên"
                                    type="text"
                                    required
                                    value={formValue?.hoTen || ''}
                                    onChange={handleFormValue()}
                                    autoComplete="off"
                                />
                                {formError?.hoTen && <p className='text-danger'>{formError?.hoTen}</p>} 
                            </div>
                            <div className="col">
                                <Input
                                    name="phoneNumber"
                                    title="Số điện thoại"
                                    label="Số điện thoại"
                                    type="text"
                                    required
                                    maxLength={10}
                                    pattern="^[0-9]+$"
                                    value={formValue?.phoneNumber || ''}
                                    onChange={handleFormValue()}
                                    autoComplete="off"
                                />
                                {formError?.phoneNumber && <p className='text-danger'>{formError?.phoneNumber}</p>} 
                            </div>
                            <div className="col">
                                <Input
                                    name="email"
                                    title="Email"
                                    label="Email"
                                    type="text"
                                    required
                                    pattern="^[a-zA-Z][a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$"
                                    value={formValue?.email || ''}
                                    onChange={handleFormValue()}
                                    autoComplete="off"
                                />
                                {formError?.email && <p className='text-danger'>{formError?.email}</p>} 
                            </div>

                        </div>



                        <div>
                        {studentEdit ? (
                        <button className="btn btn-info">Update</button>
                        ) : (
                            <button className="btn btn-success">Thêm sinh viên</button>
                        )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default StudentForm