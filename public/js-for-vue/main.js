
var app = new Vue({
    el: '.app',
    data: {
    	products :[],
		indexViewProduct : localStorage.getItem('indexViewProduct')||0,
        bookedProducts: JSON.parse(localStorage.getItem('bookedProducts')) || [],
        numProduct: localStorage.getItem('numProduct')||1,
    },
    mounted() {
        this.fetchAllProduct();
    },
    computed: {
    	totalItem: function(){
            let sum = 0;
            for(let i = 0; i < this.bookedProducts.length; i++){
                sum += (parseFloat(this.bookedProducts[i].price)*parseInt(this.bookedProducts[i].num) );
            }
            return sum;
        }
    },
	methods:{
		fetchAllProduct: function(){
            var app = this;
            axios.get('http://localhost:3000/api/products')
                .then(function (response) {
                    app.products = response.data;
                })
                .catch(function (error) {
                    // handle error
                    alert(error.message);
                });
        },
		selectProduct: function(index){
			this.indexViewProduct = index;
			localStorage.setItem('indexViewProduct',this.indexViewProduct)
			return this.indexViewProduct
		},
		saveBookedProducts: function(){
            localStorage.setItem('bookedProducts', JSON.stringify(this.bookedProducts))
        },
		addProduct: function () {
            const time = Date.now()
            const bookedProduct = {
                id : String(time),
                img_url :this.products[this.indexViewProduct].img_url[0],
               	name : this.products[this.indexViewProduct].name,
               	price : this.products[this.indexViewProduct].price,
               	num : this.numProduct

            }
            this.bookedProducts.push(bookedProduct)
            this.saveBookedProducts()
            },
        removeBookedProduct: function (index) {
	            if(confirm('Delete the product ?')){
	                if(index!==-1){
                        this.bookedProducts.splice(index, 1)
	                }
                }
                this.saveBookedProducts()
	        },
	        increaseNum: function(){
                this.numProduct = parseInt(this.numProduct) + 1
                this.saveBookedProducts()
        },
            increaseNumC: function (index) {
                this.bookedProducts[index].num += 1
                console.log(this.bookedProducts[index].num)
                this.saveBookedProducts()
            },
	        decreaseNum: function(){
	        	if(parseInt(this.numProduct)>1){
                    this.numProduct = parseInt(this.numProduct) - 1
                    this.saveBookedProducts()
	        	}
        },
            decreaseNumC: function (index) {
                if (parseInt(this.numProduct) > 1) {
                    this.numProduct = parseInt(this.numProduct) - 1
                    this.bookedProducts[inndex].num = this.numProduct
                    this.saveBookedProducts()
                }
        },
        removeCart: function () {
            if (confirm('Do you want submit ?')) {
                while (this.bookedProducts.length > 0) {
                    this.bookedProducts.splice(0, 1)
                }
                swal("Your order was submitted", "success")
            }
            
        }
	},
	
	watched:{
		bookedProducts:{
            handler:'saveBookedProducts',
			deep : true
		},
	}
})
