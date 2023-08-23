import { createSlice } from "@reduxjs/toolkit"

const initialState={
    studentList:[],
    studentEdit:undefined
}
const BTFormSlice = createSlice({
    name:'BTForm',
    initialState,
    reducers:{
        addStudent:(state,{payload}) => {
            state.studentList.push(payload)
        },
        updateStudent:(state,{payload}) => {
            //C1:
            // const index = state.productList.findIndex((prd) => prd.id === payload.id)
            // state.productList[index] = payload

            //C2:
            state.studentList = state.studentList.map((prd) => {
                if (prd.maSV === payload.maSV) {
                    return payload
                }
                return prd
            })

            // gán lại undefined khi update thành công
            state.studentEdit = undefined
        },
        deleteStudent:(state,action) => {
            const newStudent = state.studentList.filter((item) => item.maSV !== action.payload)
            return { ...state, studentList: newStudent }
        },
        editStudent:(state,{payload}) => {
            state.studentEdit = payload 
        },
    }
})
export const { reducer:BTFormReducer, actions:BTFormAction } = BTFormSlice