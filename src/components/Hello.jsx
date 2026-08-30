function currentDate(){
    const date = new Date(Date.now());
const [{ value: day }, , { value: month }, , { value: year }] = 
  new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).formatToParts(date);

return `${day}/${month}/${year}`;
}

export default function Hello({children}){
    return <>
    <div className="text-red">
        <h1>Hello</h1> Date: {currentDate()} 
    </div>
    </>
}