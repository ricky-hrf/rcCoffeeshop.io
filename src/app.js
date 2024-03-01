document.addEventListener('alpine:init', () => {
  Alpine.data('product', () => ({
    items: [
      { id: 1, name:'Robusta Brazil', img: 'product2.jpg', price: 25000 },
      { id: 2, name:'Kopi Sumatera', img: 'product3.jpg', price: 35000 },
      { id: 3, name:'Kok Tong', img: 'product2.jpg', price: 45000 },
    ],
  }));

  Alpine.store('cart', {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      //cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      //jika cart masih kosong
      if(!cartItem) {
        this.items.push({...newItem, quantity: 1, total: newItem.price});
        this.quantity++;
        this.total += newItem.price;
      }else {
        //jika barang sudah ada , cek apakah sama atau beda
        this.items = this.items.map((item) => {
          //jika barang berbeda
          if(item.id !== newItem.id) {
            return item;
          }else {
            //jika barang sudah ada
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // ambil item yang mau diremove berdasarkan id nya
      const cartItem = this.items.find((item) => item.id === id);

      //jika lebih dari 1
      if(cartItem.quantity > 1) {
        //telusuri
        this.items = this.items.map((item) => {
          //jika bukan barang yang sama
          if(item.id !== id) {
            return item;
          }else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        })
      }else if(cartItem.quantity === 1){
        //jika barangnya sisa satu
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    }
  });

});

//konversi ke rupiah
const rupiah = (number) =>{
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
  
};