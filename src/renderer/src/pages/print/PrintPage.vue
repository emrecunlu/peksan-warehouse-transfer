<script setup>
import { onBeforeMount, onBeforeUnmount, ref } from 'vue'
import '../../assets/reset.css'

const slip = ref(null)

onBeforeMount(() => {
  window.electron.ipcRenderer.on('print-label', (e, data) => {
    slip.value = data
  })
})

onBeforeUnmount(() => {
  window.electron.ipcRenderer.removeAllListeners('print-label')
})
</script>

<template>
  <div v-if="slip" class="label-container">
    <div class="label-wrapper">
      <div class="info-container">
        <div class="info-wrapper">
          <div class="label-info">
            <h1>İş Emri No</h1>
            <span>{{ slip.workOrder }}</span>
          </div>
          <div class="label-info-container">
            <div class="label-info">
              <h1>Varil No</h1>
              <span>{{ slip.barrelId }}</span>
            </div>
            <div class="label-info">
              <h1>Makine No</h1>
              <span>{{ slip.machineId }}</span>
            </div>
          </div>
        </div>
        <div class="info-wrapper">
          <div class="label-info">
            <h1>Tarih</h1>
            <span>18.07.2023 08:52</span>
          </div>
          <div class="label-info">
            <h1>Personel</h1>
            <span>{{ slip.staff }}</span>
          </div>
        </div>
      </div>
      <div class="material-table">
        <table>
          <thead>
            <tr>
              <th>Hammadde Grubu</th>
              <th>Açıklama</th>
              <th>Seri</th>
              <th>Miktar(KG)</th>
              <th>Oran</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, id) in slip.stocks" :key="id">
              <td>{{ item?.groupName ?? 'KIRMA' }}</td>
              <td>{{ item.stockName }}</td>
              <td>{{ item.lotNo }}</td>
              <td>{{ item.amount }}</td>
              <td>{{ item.ratio }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style-type: none;
  text-decoration: none;
  box-sizing: border-box;
}

.label-wrapper {
  width: 15cm;
  height: 10cm;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-90deg);
  border: 1px solid #000;
}
.label-container {
  width: 10cm;
  height: 15cm;
  position: relative;
  border: 1px solid #000;
}

.info-container {
  display: flex;
  flex-direction: column;
  row-gap: 6px;
}

.info-wrapper {
  display: flex;
  align-items: center;
}

.info-wrapper .label-info-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
}

.info-wrapper .label-info {
  display: flex;
  align-items: center;
  column-gap: 8px;
}

.info-wrapper .label-info:first-child {
  width: 50%;
}
.info-wrapper .label-info h1 {
  font-weight: 600;
  font-size: 14px;
}

.info-wrapper .label-info span {
  font-size: 14px;
}

.material-table {
  margin-top: 20px;
}

.material-table {
  width: 100%;
}

table {
  width: 100%;
}

table,
th,
td {
  border: 1px solid #000;
  border-collapse: collapse;
}

th {
  font-size: 11px;
  font-weight: 600;
  padding: 6px;
}

td {
  font-size: 11px;
  vertical-align: middle;
  padding: 2px 6px;
  overflow: hidden;
}

td:nth-child(1) {
  width: 25%;
}
td:nth-child(2) {
  width: 30%;
}

th:nth-child(3) {
  text-align: right;
}
td:nth-child(3) {
  width: 20%;
  text-align: right;
}

th:nth-child(4) {
  text-align: right;
}
td:nth-child(4) {
  width: 15%;
  text-align: right;
}

th:nth-child(5) {
  text-align: right;
}
td:nth-child(5) {
  text-align: right;
  width: 10%;
}
</style>
