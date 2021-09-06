class Grille
{
    /*Block[][]*/blocks;
    /*Piece*/piece_actuelle = null;
    /*int*/ score = 0;
    tableau;
    peutJouer = true;
    constructor(vraie_grille)
    {
        this.blocks = [];
        this.init();
    }

    init()
    {
        document.getElementById("fin").innerText = ""
        this.tableau = [];
        for (let i = 0; i < 10; i++)
        {
            this.tableau.push([]);
            for (let j = 0; j < 20; j++)
            {
                this.tableau[i].push(null);
            }
        }
    }

    update(move, grille_2 = null)
    {
        if (document.getElementById("fin").innerText !== "")return;
        if (typeof this.blocks == "undefined")
            this.blocks = [];
        if (this.piece_actuelle == null){this.piece_actuelle = new Piece(this);this.piece_actuelle.grille = this;grille_2.piece_actuelle = new Piece(grille_2);}

        let nb_lines_emptied = 0;

        for (let i = 0; i < 20; i++)
        {
            if (this.is_full(i))
            {
                this.empty(i);
                nb_lines_emptied ++;
            }
        }
        if (this.piece_actuelle.peut_bouger())
        {
            if (move)
                this.piece_actuelle.bouge();
        }
        else
        {
            this.piece_actuelle = new Piece(this, grille_2.piece_actuelle.r);
            grille_2.blocks = [];
            grille_2.tableau = [];
            grille_2.piece_actuelle = new Piece(grille_2);
            for (let i = 0; i < this.blocks.length - 1; i++)
            {
                for (let j = 0; j < this.blocks[i].length; j++)
                {
                    if (
                        this.blocks[i][j].x === this.piece_actuelle.blocks[0].x && this.blocks[i][j].y === this.piece_actuelle.blocks[0].y ||
                        this.blocks[i][j].x === this.piece_actuelle.blocks[1].x && this.blocks[i][j].y === this.piece_actuelle.blocks[1].y ||
                        this.blocks[i][j].x === this.piece_actuelle.blocks[2].x && this.blocks[i][j].y === this.piece_actuelle.blocks[2].y ||
                        this.blocks[i][j].x === this.piece_actuelle.blocks[3].x && this.blocks[i][j].y === this.piece_actuelle.blocks[3].y
                    )
                    {
                        clearInterval(rafraichissement);
                        document.getElementById("fin").innerText = "Votre score est de " + this.score + ". Vous pouvez rejouer pour l'améliorer";
                        break;
                    }
                }
            }

        }
        for (let i = 0; i < this.tableau.length; i++)
        {
            this.tableau[i].fill(null)
        }
        for (let i = 0; i < this.blocks.length; i++)
        {
            if (typeof (this.blocks[i]) != "undefined")
            {
                for (let j = 0; j < this.blocks[i].length; j++)
                {
                    if (this.blocks[i][j] instanceof Block)
                    {
                        this.tableau[this.blocks[i][j].x][this.blocks[i][j].y] = this.blocks[i][j];
                    }
                }
            }
        }
        this.update_score(nb_lines_emptied)
    }

    is_full(/*int*/ i)
    {
        for (let j = 0; j < 10; j++)
        {
            if (this.tableau[j][i] == null || (this.tableau[j][i] instanceof Block && this.tableau[j][i].piece === this.piece_actuelle))
            {
                return false;
            }
        }
        return true;
    }

    empty(/*int*/ i)
    {
        for (let int = 0; int < this.blocks.length; int++)
        {
            for (let j = 0; j < this.blocks[int].length; j++)
            {
                for (let k = 0; k < 10; k++)
                {
                    if (this.tableau[k][i] === this.blocks[int][j])
                    {
                        this.blocks[int][j] = null;
                    }
                }
            }
        }
        for (i; i > 0; i--)
        {
            for (let j = 0; j < 10; j++)
            {
                if (this.tableau[j][i] instanceof Block && this.tableau[j][i].piece !== this.piece_actuelle)
                    this.tableau[j][i].y++;
            }
        }
        for (let j = 0; j < 10; j++)
        {
            this.tableau[j][0] = null;
        }
    }

    update_score(/*int*/ lines)
    {
        switch (lines)
        {
            case 0:
                return;
            case 1:
                this.score += 40;
                break;
            case 2:
                this.score += 100;
                break;
            case 3:
                this.score += 300;
                break;
            case 4:
                this.score += 1200;
                break;
        }
    }
}
