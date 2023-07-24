// 时间校准函数
import moment from 'moment'
moment.locale("zh-cn")  
const formatTime = {
    getTime:(date)=>{
        //
        return moment(date).format('YYYY/MM/DD hh:mm:ss');
    }
}

export default formatTime