GRAPH_UTILS = {
    graph6Encode : function ( A ) {
        var v = A.length;
        var e = (v * (v-1))/2;
        var nChars = Math.ceil((e - 1) / 6) + 1;

        var i = 0;
        var j = 0;

        var chars = String.fromCharCode(63 + v);

        var charNum = 1;
        while (i < v && j < v && charNum < nChars){
            var running = 0;
            for (var bitCount = 0; bitCount < 6; bitCount++){
                if (i == j){
                    j = 0;
                    i = i + 1;
                }
                running = running << 1;
                if (i < v && j < v){
                    running = running | (A[i][j]);
                }
                j++;
            }
            var c = String.fromCharCode(running + 63);
            chars = chars + c;
            charNum++;
        }
        return chars;
    },

    graph6Decode : function ( s ) {
        var n = s.charCodeAt(0) - 63;
        var e = n * (n - 1) / 2;

        var toAddSize = 6;

        var graph = GRAPH_UTILS.makeArray(n, n);

        var count = 0;
        var index = 1;
        var x = 1;
        var y = 0;
        while (count < e){
            var c = s.charCodeAt(index) - 63;
            var toAdd = new Array(toAddSize);
            var i;
            for(i = toAddSize-1; i >= 0; i--){
                toAdd[i] = c % 2;
                c = c >> 1;
            }
            for (i = 0; i < toAddSize; i++){
                if (x == y){
                    graph[x][y] = 0;
                    x++;
                    y = 0;
                    if (x == n){
                        return graph;
                    }
                }
                graph[x][y] = toAdd[i];
                graph[y][x] = toAdd[i];
                count++;
                y++;
            }
            index++;
        }
        return graph;
    },

    makeArray : function(d1, d2) {
        var arr = new Array(d1), i, l;
        for(i = 0, l = d2; i < l; i++) {
            arr[i] = new Array(d1);
            for (var j = 0; j < d1; j++){
                arr[i][j] = 0;
            }
        }
        return arr;
    },

    randomGraph : function ( v, e ){
        if (e == undefined){
            e = Math.ceil(Math.random() * v * (v - 1) / 2);
        }
        var A = GRAPH_UTILS.makeArray(v, v);
        while (e > 0){
            var i = 1;
            var j = 0;
            while (A[i][j] == 1 || i == j){
                i = Math.floor( Math.random() * v);
                j = Math.floor( Math.random() * v);
            }
            A[i][j] = 1;
            A[j][i] = 1;
            e--;
        }
        return A;
    }
};