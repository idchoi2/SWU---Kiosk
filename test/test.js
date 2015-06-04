QUnit.module('SWU Test', {
    setup : function(){
        this.vv = 1;
    },

    teardown : function(){
        this.vv = null;
    }
});



QUnit.test('비디오를 중지한다.', function( assert ){
    assert.equal(1, 1, '1 === 1');
    assert.ok(true, 'true is truthy');
    assert.ok(1, '1 is also truthy');
    assert.ok([], 'so is an empty array or object');
});