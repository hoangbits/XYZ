<template>
    <div>
        <label for="">End point: </label>
        <input type="text" v-model="endPoint" style="width:100%">
        <label for="">Frequence: </label>
        <input type="number" v-model="frequence" style="width:100%">
        <label for="">Default error status: </label>
        <select v-model="error_status" style="width:100%">
            <option value="active">Active</option>
            <option value="positive">Positive</option>
            <option value="intermediary">Intermediary</option>
            <option value="negative">Negative</option>
        </select>
        <label for="">Pulse:</label>
        <input type="checkbox" v-model="pulse">
        <Status style="width:300px" title="This is a status with indicator" :endPoint="endPoint" :error_status="error_status" :frequence="parseInt(frequence,0)" :pulse="pulse"/>
    </div>
    
</template>

<script>
import Status from '../../components/includes/Status'
export default {
    components:{
        'Status':Status
    },
    data(){
        return {
            endPoint:"https://my.cloud.xyz.dev/api/v1/cloudron/status",
            frequence:1000,
            error_status:'negative',
            pulse:false
        }
    }
}
</script>