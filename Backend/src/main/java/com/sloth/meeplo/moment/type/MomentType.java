package com.sloth.meeplo.moment.type;

public enum MomentType {
    POLAROID(1), DAYFILM(2),FOURCUT(4);

    final private int size;

    private MomentType(int size){
        this.size=size;
    }
    public int getSize() {
        return size;
    }
}
