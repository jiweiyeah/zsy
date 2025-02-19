<template>
  <!-- 分页组件 -->
  <el-pagination class="el-pagination" :background="true" :current-page="pageable.pageNum" :page-size="pageable.pageSize"
    :page-sizes="[10, 25, 50, 100]" :total="pageable.total" layout="total, sizes, prev, pager, next, jumper"
    @size-change="handleSizeChange" @current-change="handleCurrentChange" style="font-size: 20px;"></el-pagination>
</template>

<script setup lang="ts" name="Pagination">
interface Pageable {
  pageNum: number;
  pageSize: number;
  total: number;
}

interface PaginationProps {
  pageable: Pageable;
  handleSizeChange: (size: number) => void;
  handleCurrentChange: (currentPage: number) => void;
}

defineProps<PaginationProps>();
</script>

<style scoped lang="scss">
.el-pagination {
  --el-pagination-font-size: 20px;
  --el-font-size-base: 20px;
}
</style>