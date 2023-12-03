
const adminLogin ={
    send: 'adminLogin',
    listen: 'ApiRes-adminLogin',
} 
const employeeLogin ={
    send: 'employeeLogin',
    listen: 'ApiRes-employeeLogin',
} 
const verifyTokenChannel ={
    send: 'verifyToken' ,
    listen: 'ApiRes-verifyToken',
} 
const passwordUpdateChannel ={
    send: 'passwordUpdate' ,
    listen: 'ApiRes-passwordUpdate',
} 

export {adminLogin,employeeLogin,verifyTokenChannel,passwordUpdateChannel}