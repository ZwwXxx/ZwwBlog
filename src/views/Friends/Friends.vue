<template>
    <div class="friendsBox">
        <div class="modal fade showDialog" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">New message</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="recipient-name" class="col-form-label">Recipient:</label>
                                <input type="text" class="form-control" id="recipient-name">
                            </div>
                            <div class="mb-3">
                                <label for="message-text" class="col-form-label">Message:</label>
                                <textarea class="form-control" id="message-text"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Send message</button>
                    </div>
                </div>
            </div>
        </div>
        <BgBoard title="友链" content="建立联系,共同进步"/>
        <div class="content">
            <div class="desc">
                <div class="leftBox">
                    <h2 style="font-weight: bolder">站点信息</h2>
                    <p>站点名称: Zww0891</p>
                    <p>站点地址: http://www.zww0891.fun</p>
                    <p>站点描述: 知识与美好生活分享的博客</p>
                    <p>头像链接:
                        <a href="https://cdn.zww0891.fun/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240701112347.jpg" target="_blank">https://cdn.zww0891.fun/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20240701112347.jpg</a></p>
                    <h2 style="font-weight: bolder">申请方式</h2>
                    <p>1-点击右边按钮，填写站点相关信息即可~</p>
                    <p>2-申请之前可以将本网站添加到您的站点上哦~</p>
                </div>
                <div class="rightBox">
                    <!--填写信息表单-->
                    <el-form :model="friendForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="站点名称" prop="name">
                            <el-input v-model="friendForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="站点地址" prop="url">
                            <el-input v-model="friendForm.url"></el-input>
                        </el-form-item>
                        <el-form-item label="站点描述" prop="desc">
                            <el-input v-model="friendForm.desc"></el-input>
                        </el-form-item>
                        <el-form-item label="头像链接" prop="avatar">
                            <el-input v-model="friendForm.avatar"></el-input>
                        </el-form-item>
                    </el-form>
                    <button class="applyButton" @click="submitForm('ruleForm')">申请友链</button>

                </div>


            </div>
            <div class="friendBox">
                <div class="friendList">
                    <!--<div class="singleFriend" :style=" backgroundImage: `url(${this.backgroundImageUrl})`">-->
                    <div class="singleFriend" v-for="(friend,index) in friends " :key="index"
                         :style="{ 'background-image': `url(${friend.avatar})` }"
                         @click="jumpToWeb(friend.url)">

                        <div class="mask"></div>
                        <div class="friendAvatar">
                            <img :src="friend.avatar" alt="" v-if="friend.avatar">
                            <img src="@/assets/logo.png" alt="" v-if="!friend.avatar">
                        </div>
                        <div class="friendName">
                            {{ friend.name }}
                        </div>
                        <div class="friendDesc">
                            {{ friend.description }}
                        </div>
                    </div>


                </div>
            </div>

        </div>
    </div>
</template>

<script>
import BgBoard from "@/components/BgBoard.vue";
import {selectList, submit} from "@/api/friend";

export default {
    name: "Friends",
    components: {BgBoard},
    data() {
        return {
            friends: [],
            friendForm:{},
            rules: {
                name: [
                    { required: true, message: '请输入站点名称', trigger: 'blur' },
                ],
                url: [
                    { required: true, message: '请输入站点地址', trigger: 'blur' },
                ],
                desc: [
                    { required: true, message: '请输入站点描述', trigger: 'blur' },
                ],
                avatar: [
                    { required: true, message: '请输入头像链接', trigger: 'blur' },
                ],

            }
        }
    },
    mounted() {
        this.getFriendData()
    },
    methods: {
        async getFriendData() {
            this.loading = true
            const res = await selectList(1, 999)
            if (res.code === 20000) {
                this.friends=res.data.records.filter(i=>i.status===true)
            }
        },
        jumpToWeb(url) {
            window.open(url, "_blank");
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    submit(this.friendForm).then(res=>{
                        if (res.code===20000){
                            this.$message({
                                message: '申请成功，博主在看到的第一时间内会尽快处理滴~',
                                type: 'success',
                                customClass: 'messageIndex',
                                showClose: true,
                            });
                        }
                    })
                } else {
                    this.$message({
                        message: '你还有信息没填完呢哥们',
                        type: 'error',
                        customClass: 'messageIndex',
                        showClose: true,
                    });
                    return false;
                }
            });
        },
    }
}
</script>

<style scoped>

.messageIndex{
    z-index: 3000 !important;
}
.friendsBox {
    min-height: calc(100vh - 70px);
    padding-top: 60px;
}

.content {
    min-height: 100vh;
    width: 70%;
    margin: 0 auto;
}

.desc {
    color: var(--text-color);
    background: var(--bg1);
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    margin-bottom: 20px;
    display: flex;
    overflow: hidden;
}
.leftBox{
    width: 50%;
    overflow-wrap: break-word;
}
.rightBox{
    width: 50%;
}

.applyButton {
    border: none;
    background-image: linear-gradient(to right, #4aeaff, #0021ff);
    border-radius: 10px;
    padding: 8px 14px;
    color: white;
    font-size: 17px;
    font-weight: bolder;
    transition: all 0.3s ease;
    float: right;
}

.applyButton:hover {
    background-image: linear-gradient(to right, #00dca9, #228dff);
    transform:translateY(-5px);
}

.friendBox {
    min-height: 500px;
}

.friendList {
    /*display: flex;*/
    /*flex-wrap: wrap;*/
    /*align-items: center;*/
    /*justify-content: space-between;*/
    display: grid;
    grid-template-columns:  1fr 1fr 1fr;
    grid-gap: 10px;
}

.mask {
    position: absolute;
    background: #000000;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    transition: 0.5s ease-in-out;
}

.singleFriend {
    cursor: pointer;
    /*定义初始大小为三分之一，再减去左右外边距10+10*/
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    padding: 10px;
    overflow: hidden;
    margin-bottom: 10px;
    transition: 0.3s ease-out;
    position: relative;
    background-size: cover;
    background-position: center;
    max-height: 158px;
}

.friendAvatar {
    transition: 0.5s ease-out;
}

.friendAvatar img {
    overflow: hidden;
    border-radius: 50%;
    height: 90px;
    width: 90px;
}

.friendName {
    font-size: 30px;
    font-weight: bolder;
    transition: transform 0.3s ease-out;
}

.singleFriend:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 14px rgba(0, 0, 0, 0.3);
    /*background: #646464;*/

    .friendAvatar {
        transform: translateY(-100px);
    }

    .friendName {
        transform: translateY(-70px);
        color: white;
    }

    .friendDesc {
        /*bottom: 60px;*/
        opacity: 1;
        transform: translateY(-70px);
    }

    .mask {
        opacity: 0.5;
    }
}

.friendDesc {
    /*position: absolute;*/
    /*bottom: -20px;*/
    opacity: 0;
    color: white;
    font-weight: bolder;
    font-size: 16px;
    transition: 0.3s ease-out;
    z-index: -4;
}


</style>
