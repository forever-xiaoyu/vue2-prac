import mock from 'mockjs'

mockData.enable = true

function mockData () {
  mock.mock(new RegExp('/api/good/list'), {
    success: true,
    msg: 'ok',
    data: [
      {
        name: '佐今明 牛黄上清片 48片 清热解毒上火牙龈肿痛大便干我却饿哦 in 不 demo1',
        price: '21.01',
        img: 'https://img11.360buyimg.com/da/s200x200_jfs/t9103/326/1873047824/232469/1fb14200/59c0c773N4eb287fe.jpg!q70.webp'
      },
      {
        name: '佐今明 牛黄上清片 48片 清热解毒上火牙龈肿痛大便干我却饿哦 in 不 demo2',
        price: '22.02',
        img: 'https://img11.360buyimg.com/da/s200x200_jfs/t9103/326/1873047824/232469/1fb14200/59c0c773N4eb287fe.jpg!q70.webp'
      },
      {
        name: '佐今明 牛黄上清片 48片 清热解毒上火牙龈肿痛大便干我却饿哦 in 不 demo3',
        price: '22.03',
        img: 'https://img11.360buyimg.com/da/s200x200_jfs/t9103/326/1873047824/232469/1fb14200/59c0c773N4eb287fe.jpg!q70.webp'
      },
      {
        name: '佐今明 牛黄上清片 48片 清热解毒上火牙龈肿痛大便干我却饿哦 in 不 demo4',
        price: '22.04',
        img: 'https://img11.360buyimg.com/da/s200x200_jfs/t9103/326/1873047824/232469/1fb14200/59c0c773N4eb287fe.jpg!q70.webp'
      },
      {
        name: '佐今明 牛黄上清片 48片 清热解毒上火牙龈肿痛大便 demo5',
        price: '22.05',
        img: 'https://img11.360buyimg.com/da/s200x200_jfs/t9103/326/1873047824/232469/1fb14200/59c0c773N4eb287fe.jpg!q70.webp'
      },
      {
        name: '佐今明 牛黄上清片 48片 清热解毒上火牙龈肿痛大便 demo6',
        price: '22.06',
        img: 'https://img11.360buyimg.com/da/s200x200_jfs/t9103/326/1873047824/232469/1fb14200/59c0c773N4eb287fe.jpg!q70.webp'
      },
      {
        name: '佐今明 牛黄上清片 48片 清热解毒上火牙龈肿痛大便 demo7',
        price: '22.07',
        img: 'https://img11.360buyimg.com/da/s200x200_jfs/t9103/326/1873047824/232469/1fb14200/59c0c773N4eb287fe.jpg!q70.webp'
      },
    ]
  })
}

export default mockData