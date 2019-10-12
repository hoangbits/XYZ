<template>
	<div class="status">
		<span class="_title">{{title}}</span> 
		<status-indicator class="indicator" :status="status" :pulse="pulse"></status-indicator>
	</div>
</template>
<script>
	import {StatusIndicator} from 'vue-status-indicator'	
	export default {
		name: "Status",
		components:{
			StatusIndicator
		},
		data(){
			return {
				status: null,
				color: null,
				timestamp: null
			}
		},
		props: {
			pulse:{
				type:Boolean,
				default:false
			},
			error_status:{
				type:String,
				default:"positive",
				validator: function(value) {	
					var validValues = ["active", "positive", "intermediary", "negative"];
					return validValues.indexOf(value) > -1;
				}
			},
			title: {
				type:String,
				default:null
			},
			endPoint: {
				type: String,
				required:true,
				default: null
			},
			theme: {
				type: String,
				default: "flat",
				validator: function(value) {
					var validValues = ["flat", "plastic", "flat-square", "social"];
					return validValues.indexOf(value) > -1;
				}
			},
			frequence: {
				type: Number,
				default: 1000
			}
		},
		methods:{
			async getStatus(){
				var self = this
				await this.$axios.get(this.endPoint).then((data)=>{
					self.status = 'active'
				}).catch((errors)=>{
					console.log(errors)
					self.status = self.error_status
				})
				this.timestamp = new Date()
				setTimeout(async function(){
					await self.getStatus()
				}, this.frequence)
			}
		},
		created(){
			this.getStatus()
		}
	};
</script>

<style lang="css" scoped>
	.status{
		width: 100%;
		display: block;
	}
	._title{
		font-weight: bold;
	}
	.indicator{
		margin-top: 7px;
    	float: right;
	}
</style>