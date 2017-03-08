module.exports = {
    toTernary: function(decimal){
        return this.toBaseN(decimal, 3);
    },
    fromTernary: function(ternary){
        return this.fromBaseN(ternary, 3);
    },
    toBinary: function(decimal){
        return this.toBaseN(decimal, 2);
    },
    fromBinary: function(binary){
        return this.fromBaseN(binary, 2);
    },
    toBaseN: function(decimal, base){
        var remainder = 0;
        var quotient = decimal;
        var i = 0;
        var result = 0;
        while(quotient > 0)
        {
            remainder = quotient % base;
            quotient = Math.floor(quotient / base);
            result = result + this.pow(10, i) * remainder;
            i++;
        }
        return result;
    },
    fromBaseN: function(decimal, base){
        var remainder = 0;
        var quotient = decimal;
        var i = 0;
        var result = 0;
        while(quotient > 0)
        {
            remainder = quotient % 10;
            quotient = Math.floor(quotient / 10);
            result = result + this.pow(base, i) * remainder;
            i++;
        }
        return result;
    },
    toFactoradic: function(decimal){
        var remainder = 0;
        var quotient = decimal;
        var i = 0;
        var result = 0;
        while(quotient > 0)
        {
            remainder = quotient % (i + 1);
            quotient = Math.floor(quotient / (i + 1));
            result = result + this.pow(10, i) * remainder;
            i++;
        }
        return result;
    },
    fromFactoradic: function(factoradic){
        var remainder = 0;
        var quotient = factoradic;
        var i = 0;
        var result = 0;
        while(quotient > 0)
        {
            remainder = quotient % 10;
            quotient = Math.floor(quotient / 10);
            result = result + this.factorial(i) * remainder;
            i++;
        }
        return result;
    },  
    pow: function(a, b){
        var result = 1;
        for(var i = 0; i < b; i++){
           result *= a;
        }
        return result;
    },
    factorial: function(n){
        if(n == 0){
            return 1;
        }
        else if(n == 1){
            return 1;
        }
        else{
            return this.factorial(n -1) * n;
        }
    }
}
