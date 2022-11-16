package com.sloth.meeplo.moment.type;

public enum MomentType {
    POLAROID(71), DAYFILM(63),FOURCUT(130);

    final private int size;

    private MomentType(int size){
        this.size=size;
    }
    public int getSize() {
        return size;
    }
}
