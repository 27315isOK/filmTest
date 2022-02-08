<template>
    <div class="bg">
        <h2>mine</h2>
        <div class="bg1">
            <input>
            <div>{{info}}</div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            info:'rember'
        };
    },
    methods:{

    },
    components:{

    },
    mounted(){

    }
}
</script>
<style scoped>
    .bg{
        position: relative;
    }
    .bg1{
        position: absolute;
    }
    .bg h2{
        color: #f60;
    }
</style>