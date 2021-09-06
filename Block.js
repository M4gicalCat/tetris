class Block
{
    /*string*/ color;
    /*int*/ x;
    /*int*/ y;
    /*Piece*/ piece;
    /*Grille*/ grille;
    constructor(/*string*/ couleur, /*int*/ x,/*int*/ y, /*Piece*/ piece, /*Grille*/ grille)
    {
        this.color = couleur;
        this.x = x;
        this.y = y;
        this.piece = piece;
        this.grille = grille;
    }
}