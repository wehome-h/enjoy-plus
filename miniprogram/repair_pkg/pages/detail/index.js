import qqmapsdk from '../../../utils/qqmapsdk'

Page({
  data: {
    latitude: null,
    longitude: null,
    scale: 16,
    markers: [],
    detail: {},
    polyline: []
  },

  async getLocation() {
    const res = await wx.getLocation({
      type: 'gcj02'
    })

    this.setData({
      latitude: res.latitude,
      longitude: res.longitude
    })
  },

  getPolyLine() {
    qqmapsdk.direction({
      mode: 'bicycling',
      form: {
        latitude: 23.261,
        longitude: 113.811
      },
      to: {
        latitude: this.data.latitude,
        longitude: this.data.longitude
      },
      success: (res) => {
        console.log(res)
        // 提取压缩路径坐标
        const coors = res.result.routes[0].polyline
        for (let i = 2; i < coors.length; i++) {
          coors[i] = coors[i - 2] + coors[i] / 1000000
        }

        const points = []
        // 将解压后的坐标放入点数组中
        for (let i = 0; i < coors.length; i += 2) {
          points.push({
            latitude: coors[i],
            longitude: coors[i + 1]
          })
        }

        this.setData({
          polyline: [
            {
              points,
              color: '#FF0000DD',
              width: 4
            }
          ]
        })
      }
    })
  },

  async getDetail(id) {
    const res = await wx.http.get(`repair/${id}`)
    this.setData({
      detail: res.data
    })
  },

  async onLoad() {
    await this.getLocation()
    this.getPolyLine()
  }
})
