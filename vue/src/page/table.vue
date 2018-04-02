<template>
    <div>
        <el-button type="primary" @click="filterShow">Tab+树形无限级选择</el-button>

        <!-- 筛选 -->
        <table-head-dialog title="表头筛选" :show.sync="dialog.filter.show" :defaultChecked.sync="dialog.filter.checked" :dialogData="dialog.filter.data" @confirm="tableUpdate">
        </table-head-dialog>
    </div>
</template>

<script>
import tableHeadDialog from 'sysComponents/tableHeadGroup/dialogView'
export default {
    data() {
        return {
            dialog: {
                filter: {
                    show: false,
                    checked: [],
                    data: {}
                }
            },
            checkAll: true
        }
    },
    methods: {
        // 获取全部列头数据
        getFilterData() {
            // 获取筛选框中全部数据。防止重复获取
            if (!this.dialog.filter.data.hasOwnProperty()) {
                this.$axios({
                    url: '/groupList',
                    type: 'get'
                }).then(res => {
                    // 根据表头信息初始化已筛选信息
                    if (!this.dialog.filter.checked.length) {
                        // demo中如此做会有BUG
                        // this.dialog.filter.checked = []
                        // this.tableData.head.forEach(el => {
                        //     this.dialog.filter.checked.push(el.key)
                        // })
                        this.dialog.filter.checked = ['name', 'sex', 'age', 'address', 'email', 'remark']
                    }
                    this.dialog.filter.data = res.data
                }).catch(err => {
                    this.$message.error(`获取数据失败，失败码：${err.response.status}`)
                })
            }
        },
        filterShow() {
            this.getFilterData()
            this.dialog.filter.show = true
        },
        // 根据选择列内容变更表格
        tableUpdate() {
            // 提交已选中的信号，更新table数据
            // ajax data:{signalList: 'this.dialog.filter.checked'}
            // this.getTableData(data)
            console.log(this.dialog.filter.checked)
            console.log('查询表格数据')
            this.tableData.loading = true
        }
    },
    components: {tableHeadDialog}
}
</script>
