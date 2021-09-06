class Piece
{
    /*int*/ x;
    /*int*/ y;
    /*Block[]*/ blocks;
    /*string*/ color;
    /*int*/ direction;
    /*Grille*/ grille;
    r;
    constructor(/*Grille*/ grille, r = null)
    {
        if (r === null)
        {
            r = Math.floor(Math.random() * 7);
        }

        this.grille = grille;
        this.y = 0;
        this.blocks = [];
        this.direction = 0;
        this.x = 4;
        this.r = r;
        switch (this.r)
        {
            case 0:
                this.color = "light_blue";
                this.x = 3;
                this.blocks.push(new Block(this.color, this.x, this.y, this, this.grille));
                this.blocks.push(new Block(this.color, this.x + 1, this.y, this, this.grille));
                this.blocks.push(new Block(this.color, this.x + 2, this.y, this, this.grille));
                this.blocks.push(new Block(this.color, this.x + 3, this.y, this, this.grille));
                break;
            case 1:
                this.color = "dark_blue";
                this.blocks.push(new Block(this.color, this.x, this.y, this, this.grille))
                this.blocks.push(new Block(this.color, this.x, this.y + 1, this, this.grille));
                this.blocks.push(new Block(this.color, this.x+1, this.y + 1, this, this.grille));
                this.blocks.push(new Block(this.color, this.x+2, this.y + 1, this, this.grille));
                break;
            case 2:
                this.color = "orange";
                this.blocks.push(new Block(this.color, this.x+2, this.y, this, this.grille))
                this.blocks.push(new Block(this.color, this.x, this.y + 1, this, this.grille));
                this.blocks.push(new Block(this.color, this.x+1, this.y + 1, this, this.grille));
                this.blocks.push(new Block(this.color, this.x+2, this.y + 1, this, this.grille));
                break;
            case 3:
                this.color = "yellow";
                this.blocks.push(new Block(this.color, this.x, this.y, this, this.grille));
                this.blocks.push(new Block(this.color, this.x+1, this.y, this, this.grille));
                this.blocks.push(new Block(this.color, this.x, this.y + 1, this, this.grille));
                this.blocks.push(new Block(this.color, this.x+1, this.y + 1, this, this.grille));
                break;
            case 4:
                this.color = "green";
                this.blocks.push(new Block(this.color, this.x + 1, this.y, this, this.grille));
                this.blocks.push(new Block(this.color, this.x + 2, this.y, this, this.grille));
                this.blocks.push(new Block(this.color, this.x + 0, this.y + 1, this, this.grille));
                this.blocks.push(new Block(this.color, this.x + 1, this.y + 1, this, this.grille));
                break;
            case 5:
                this.color = "violet";
                this.blocks.push(new Block(this.color, this.x + 1, this.y, this, this.grille));
                this.blocks.push(new Block(this.color, this.x, this.y + 1, this, this.grille));
                this.blocks.push(new Block(this.color, this.x+1, this.y + 1, this, this.grille));
                this.blocks.push(new Block(this.color, this.x+2, this.y + 1, this, this.grille));
                break;
            case 6:
                this.color = "red";
                this.blocks.push(new Block(this.color, this.x, this.y, this, this.grille));
                this.blocks.push(new Block(this.color, this.x+1, this.y, this, this.grille));
                this.blocks.push(new Block(this.color, this.x+1, this.y+1, this, this.grille));
                this.blocks.push(new Block(this.color, this.x+2, this.y+1, this, this.grille));
                break;
        }
        this.grille.blocks.push(this.blocks);
    }

    peut_bouger()
    {
        for (let i = 0; i < this.blocks.length; i++)
        {
            if (this.blocks[i].y >= 19)
            {
                return false
            }
            if (
                this.grille.tableau[this.blocks[i].x][this.blocks[i].y+1] != null &&
                (
                    this.grille.tableau[this.blocks[i].x][this.blocks[i].y+1] instanceof Block &&
                    this.grille.tableau[this.blocks[i].x][this.blocks[i].y+1].piece !== this
                )
            )
            {
                return false;
            }
        }
        return true;
    }

    bouge()
    {
        for (let i = 0; i < this.blocks.length; i++)
        {
            this.blocks[i].y ++;
        }
        this.y++;
    }

    peut_aller_a_gauche()
    {
        for (let i = 0; i < this.blocks.length; i++)
        {
            let b = this.blocks[i]
            if (b.x <= 0)
            {
                return false;
            }
            if (this.grille.tableau[b.x-1][b.y] instanceof Block && this.grille.tableau[b.x-1][b.y].piece !== this)
            {
                return false;
            }
        }
        return true;
    }

    peut_aller_a_droite()
    {
        for (let i = 0; i < this.blocks.length; i++)
        {
            let b = this.blocks[i]
            if (b.x >= 9)
            {
                return false;
            }
            if (this.grille.tableau[b.x+1][b.y] instanceof Block && this.grille.tableau[b.x+1][b.y].piece !== this)
            {
                return false;
            }
        }
        return true;
    }

    bouge_gauche()
    {
        for (let i = 0; i < this.blocks.length; i++)
        {
            this.blocks[i].x --;
        }
        this.x --;
    }

    bouge_droite()
    {
        for (let i = 0; i < this.blocks.length; i++)
        {
            this.blocks[i].x ++;
        }
        this.x ++;
    }

    rotation()
    {
        switch (this.color)
        {
            case "light_blue":
                switch (this.direction)
                {
                    case 0:

                        if (this.x >= 9|| this.y < 3)
                            break;
                        if (
                            this.grille.tableau[this.x][this.y-3] !== null && this.grille.tableau[this.x][this.y-3].piece !== this ||
                            this.grille.tableau[this.x][this.y-2] !== null && this.grille.tableau[this.x][this.y-2].piece !== this ||
                            this.grille.tableau[this.x][this.y-1] !== null && this.grille.tableau[this.x][this.y-1].piece !== this ||
                            this.grille.tableau[this.x][this.y] !== null && this.grille.tableau[this.x][this.y].piece !== this
                        )
                            break;
                        this.direction = 1;
                        this.blocks[0].x = this.x;
                        this.blocks[0].y = this.y - 3;
                        this.blocks[1].x = this.x;
                        this.blocks[1].y = this.y - 2;
                        this.blocks[2].x = this.x;
                        this.blocks[2].y = this.y - 1;
                        this.blocks[3].x = this.x;
                        this.blocks[3].y = this.y;
                        break;
                    case 1:
                        if (this.x > 6)
                            break;
                        if (
                            this.grille.tableau[this.x][this.y] !== null && this.grille.tableau[this.x][this.y].piece !== this ||
                            this.grille.tableau[this.x+1][this.y] !== null && this.grille.tableau[this.x+1][this.y].piece !== this ||
                            this.grille.tableau[this.x+2][this.y] !== null && this.grille.tableau[this.x+2][this.y].piece !== this ||
                            this.grille.tableau[this.x+3][this.y] !== null && this.grille.tableau[this.x+3][this.y].piece !== this
                        )
                            break;
                        this.direction = 0;
                        this.blocks[0].x = this.x;
                        this.blocks[0].y = this.y;
                        this.blocks[1].x = this.x + 1;
                        this.blocks[1].y = this.y;
                        this.blocks[2].x = this.x + 2;
                        this.blocks[2].y = this.y;
                        this.blocks[3].x = this.x + 3;
                        this.blocks[3].y = this.y;
                        break;
                }
                break;
            case "dark_blue":
                switch (this.direction)
                {
                    case 0:
                        if (this.y <= 0 || this.x > 8)
                            break;
                        if (
                            (this.grille.tableau[this.x][this.y+1] !== null && this.grille.tableau[this.x][this.y+1].piece !== this) ||
                            (this.grille.tableau[this.x][this.y] !== null && this.grille.tableau[this.x][this.y].piece !== this) ||
                            (this.grille.tableau[this.x][this.y-1] !== null && this.grille.tableau[this.x][this.y-1].piece !== this) ||
                            (this.grille.tableau[this.x+1][this.y-1] !== null && this.grille.tableau[this.x+1][this.y-1].piece !== this)
                        )
                            break;
                        this.direction = 1;
                        this.blocks[0].x = this.x;
                        this.blocks[0].y = this.y+1;
                        this.blocks[1].x = this.x;
                        this.blocks[1].y = this.y;
                        this.blocks[2].x = this.x;
                        this.blocks[2].y = this.y-1;
                        this.blocks[3].x = this.x+1;
                        this.blocks[3].y = this.y-1;
                        break;
                    case 1:
                        if (this.x > 7 || this.y > 18)
                            break;
                        if (
                            (this.grille.tableau[this.x][this.y] !== null && this.grille.tableau[this.x][this.y].piece !== this) ||
                            (this.grille.tableau[this.x+1][this.y] !== null && this.grille.tableau[this.x+1][this.y].piece !== this) ||
                            (this.grille.tableau[this.x+2][this.y] !== null && this.grille.tableau[this.x+2][this.y].piece !== this) ||
                            (this.grille.tableau[this.x+2][this.y+1] !== null && this.grille.tableau[this.x+2][this.y+1].piece !== this)
                        )
                            break;
                        this.direction = 2;
                        this.blocks[0].x = this.x;
                        this.blocks[0].y = this.y;
                        this.blocks[1].x = this.x+1;
                        this.blocks[1].y = this.y;
                        this.blocks[2].x = this.x+2;
                        this.blocks[2].y = this.y;
                        this.blocks[3].x = this.x+2;
                        this.blocks[3].y = this.y+1;
                        break;
                    case 2:
                        if (this.x > 8 || this.y > 17)
                            break;
                        if (
                            (this.grille.tableau[this.x+1][this.y] !== null && this.grille.tableau[this.x+1][this.y].piece !== this) ||
                            (this.grille.tableau[this.x+1][this.y+1] !== null && this.grille.tableau[this.x+1][this.y+1].piece !== this) ||
                            (this.grille.tableau[this.x+1][this.y+2] !== null && this.grille.tableau[this.x+1][this.y+2].piece !== this) ||
                            (this.grille.tableau[this.x][this.y+2] !== null && this.grille.tableau[this.x][this.y+2].piece !== this)
                        )
                            break;
                        this.direction = 3;
                        this.blocks[0].x = this.x+1;
                        this.blocks[0].y = this.y;
                        this.blocks[1].x = this.x+1;
                        this.blocks[1].y = this.y+1;
                        this.blocks[2].x = this.x+1;
                        this.blocks[2].y = this.y+2;
                        this.blocks[3].x = this.x;
                        this.blocks[3].y = this.y+2;
                        break;
                    case 3:
                        if (this.x > 7 || this.y > 18)
                            break;
                        if (
                            (this.grille.tableau[this.x][this.y] !== null && this.grille.tableau[this.x][this.y].piece !== this) ||
                            (this.grille.tableau[this.x][this.y+1] !== null && this.grille.tableau[this.x][this.y+1].piece !== this) ||
                            (this.grille.tableau[this.x+1][this.y+1] !== null && this.grille.tableau[this.x+1][this.y+1].piece !== this) ||
                            (this.grille.tableau[this.x+2][this.y+1] !== null && this.grille.tableau[this.x+2][this.y+1].piece !== this)
                        )
                            break;
                        this.direction = 0;
                        this.blocks[0].x = this.x;
                        this.blocks[0].y = this.y;
                        this.blocks[1].x = this.x;
                        this.blocks[1].y = this.y+1;
                        this.blocks[2].x = this.x+1;
                        this.blocks[2].y = this.y+1;
                        this.blocks[3].x = this.x+2;
                        this.blocks[3].y = this.y+1;
                        break;
                }
                break;
            case "orange":
                switch (this.direction)
                {
                    case 0:
                        if (this.y > 17 || this.x > 8)
                            break;
                        if (
                            (this.grille.tableau[this.x][this.y] !== null && this.grille.tableau[this.x][this.y].piece !== this) ||
                            (this.grille.tableau[this.x][this.y+1] !== null && this.grille.tableau[this.x][this.y+1].piece !== this) ||
                            (this.grille.tableau[this.x][this.y+2] !== null && this.grille.tableau[this.x][this.y+2].piece !== this) ||
                            (this.grille.tableau[this.x+1][this.y+2] !== null && this.grille.tableau[this.x+1][this.y+2].piece !== this)
                        )
                            break;
                        this.direction = 1;
                        this.blocks[0].x = this.x;
                        this.blocks[0].y = this.y;
                        this.blocks[1].x = this.x;
                        this.blocks[1].y = this.y+1;
                        this.blocks[2].x = this.x;
                        this.blocks[2].y = this.y+2;
                        this.blocks[3].x = this.x+1;
                        this.blocks[3].y = this.y+2;
                        break;
                    case 1:
                        if (this.y > 18 || this.x > 7)
                            break;
                        if (
                            (this.grille.tableau[this.x][this.y] !== null && this.grille.tableau[this.x][this.y].piece !== this) ||
                            (this.grille.tableau[this.x+1][this.y] !== null && this.grille.tableau[this.x+1][this.y].piece !== this) ||
                            (this.grille.tableau[this.x+2][this.y] !== null && this.grille.tableau[this.x+2][this.y].piece !== this) ||
                            (this.grille.tableau[this.x][this.y+1] !== null && this.grille.tableau[this.x][this.y+1].piece !== this)
                        )
                            break;
                        this.direction = 2;
                        this.blocks[0].x = this.x;
                        this.blocks[0].y = this.y;
                        this.blocks[1].x = this.x+1;
                        this.blocks[1].y = this.y;
                        this.blocks[2].x = this.x+2;
                        this.blocks[2].y = this.y;
                        this.blocks[3].x = this.x;
                        this.blocks[3].y = this.y+1;
                        break;
                    case 2:
                        if (this.y > 17 || this.x > 8)
                            break;
                        if (
                            (this.grille.tableau[this.x][this.y] !== null && this.grille.tableau[this.x][this.y].piece !== this) ||
                            (this.grille.tableau[this.x+1][this.y] !== null && this.grille.tableau[this.x+1][this.y].piece !== this) ||
                            (this.grille.tableau[this.x+1][this.y+1] !== null && this.grille.tableau[this.x+1][this.y+1].piece !== this) ||
                            (this.grille.tableau[this.x][this.y+2] !== null && this.grille.tableau[this.x+1][this.y+2].piece !== this)
                        )
                            break;
                        this.direction = 3;
                        this.blocks[0].x = this.x;
                        this.blocks[0].y = this.y;
                        this.blocks[1].x = this.x+1;
                        this.blocks[1].y = this.y;
                        this.blocks[2].x = this.x+1;
                        this.blocks[2].y = this.y+1;
                        this.blocks[3].x = this.x+1;
                        this.blocks[3].y = this.y+2;
                        break;
                    case 3:
                        if (this.y > 17 || this.x > 8)
                            break;
                        if (
                            (this.grille.tableau[this.x+2][this.y] !== null && this.grille.tableau[this.x+2][this.y].piece !== this) ||
                            (this.grille.tableau[this.x][this.y+1] !== null && this.grille.tableau[this.x][this.y+1].piece !== this) ||
                            (this.grille.tableau[this.x+1][this.y+1] !== null && this.grille.tableau[this.x+1][this.y+1].piece !== this) ||
                            (this.grille.tableau[this.x+2][this.y+1] !== null && this.grille.tableau[this.x+1][this.y+1].piece !== this)
                        )
                            break;
                        this.direction = 0;
                        this.blocks[0].x = this.x+2;
                        this.blocks[0].y = this.y;
                        this.blocks[1].x = this.x;
                        this.blocks[1].y = this.y+1;
                        this.blocks[2].x = this.x+1;
                        this.blocks[2].y = this.y+1;
                        this.blocks[3].x = this.x+2;
                        this.blocks[3].y = this.y+1;
                        break;
                }
                break;
            case "green":
                switch (this.direction)
                {
                    case 0:
                        if (this.x > 8 || this.y > 17)
                            break;
                        if (
                            (this.grille.tableau[this.x][this.y] !== null && this.grille.tableau[this.x][this.y].piece !== this) ||
                            (this.grille.tableau[this.x][this.y+1] !== null && this.grille.tableau[this.x][this.y+1].piece !== this) ||
                            (this.grille.tableau[this.x+1][this.y+1] !== null && this.grille.tableau[this.x+1][this.y+1].piece !== this) ||
                            (this.grille.tableau[this.x+1][this.y+2] !== null && this.grille.tableau[this.x+1][this.y+2].piece !== this)
                        )
                            break;
                        this.direction = 1;
                        this.blocks[0].x = this.x;
                        this.blocks[0].y = this.y;
                        this.blocks[1].x = this.x;
                        this.blocks[1].y = this.y+1;
                        this.blocks[2].x = this.x+1;
                        this.blocks[2].y = this.y+1;
                        this.blocks[3].x = this.x+1;
                        this.blocks[3].y = this.y+2;
                        break;
                    case 1:
                        if (this.x > 7 || this.y > 17)
                            break;
                        if (
                            (this.grille.tableau[this.x+1][this.y] !== null && this.grille.tableau[this.x+1][this.y].piece !== this) ||
                            (this.grille.tableau[this.x+2][this.y] !== null && this.grille.tableau[this.x+2][this.y].piece !== this) ||
                            (this.grille.tableau[this.x][this.y+1] !== null && this.grille.tableau[this.x][this.y+1].piece !== this) ||
                            (this.grille.tableau[this.x+1][this.y+1] !== null && this.grille.tableau[this.x+1][this.y+1].piece !== this)
                        )
                            break;
                        this.direction = 0;
                        this.blocks[0].x = this.x+1;
                        this.blocks[0].y = this.y;
                        this.blocks[1].x = this.x+2;
                        this.blocks[1].y = this.y;
                        this.blocks[2].x = this.x;
                        this.blocks[2].y = this.y+1;
                        this.blocks[3].x = this.x+1;
                        this.blocks[3].y = this.y+1;
                        break;
                }
                break;
            case "red":
                switch (this.direction)
                {
                    case 0:
                        if (this.x > 8 || this.y > 17)
                            break;
                        if (
                            (this.grille.tableau[this.x+1][this.y] !== null && this.grille.tableau[this.x+1][this.y].piece !== this) ||
                            (this.grille.tableau[this.x+1][this.y+1] !== null && this.grille.tableau[this.x+1][this.y+1].piece !== this) ||
                            (this.grille.tableau[this.x][this.y+1] !== null && this.grille.tableau[this.x][this.y+1].piece !== this) ||
                            (this.grille.tableau[this.x][this.y+2] !== null && this.grille.tableau[this.x][this.y+2].piece !== this)
                        )
                            break;
                        this.direction = 1;
                        this.blocks[0].x = this.x+1;
                        this.blocks[0].y = this.y;
                        this.blocks[1].x = this.x+1;
                        this.blocks[1].y = this.y+1;
                        this.blocks[2].x = this.x;
                        this.blocks[2].y = this.y+1;
                        this.blocks[3].x = this.x;
                        this.blocks[3].y = this.y+2;
                        break;
                    case 1:
                        if (this.x > 7 || this.y > 17)
                            break;
                        if (
                            (this.grille.tableau[this.x][this.y] !== null && this.grille.tableau[this.x][this.y].piece !== this) ||
                            (this.grille.tableau[this.x+1][this.y] !== null && this.grille.tableau[this.x+1][this.y].piece !== this) ||
                            (this.grille.tableau[this.x+1][this.y+1] !== null && this.grille.tableau[this.x+1][this.y+1].piece !== this) ||
                            (this.grille.tableau[this.x+2][this.y+2] !== null && this.grille.tableau[this.x+2][this.y+2].piece !== this)
                        )
                            break;
                        this.direction = 0;
                        this.blocks[0].x = this.x;
                        this.blocks[0].y = this.y;
                        this.blocks[1].x = this.x+1;
                        this.blocks[1].y = this.y;
                        this.blocks[2].x = this.x+1;
                        this.blocks[2].y = this.y+1;
                        this.blocks[3].x = this.x+2;
                        this.blocks[3].y = this.y+1;
                        break;
                }
                break;
            case "violet":
                switch (this.direction)
                {
                    case 0:
                        if (this.x > 8 || this.y > 17)
                            break;
                        if (
                            this.grille.tableau[this.x][this.y] !== null && this.grille.tableau[this.x][this.y].piece !== this ||
                            this.grille.tableau[this.x][this.y+1] !== null && this.grille.tableau[this.x][this.y+1].piece !== this ||
                            this.grille.tableau[this.x+1][this.y+1] !== null && this.grille.tableau[this.x+1][this.y+1].piece !== this ||
                            this.grille.tableau[this.x][this.y+2] !== null && this.grille.tableau[this.x][this.y+2].piece !== this
                        )
                            break;
                        this.direction = 1;
                        this.blocks[0].x = this.x;
                        this.blocks[0].y = this.y;
                        this.blocks[1].x = this.x;
                        this.blocks[1].y = this.y+1;
                        this.blocks[2].x = this.x+1;
                        this.blocks[2].y = this.y+1;
                        this.blocks[3].x = this.x;
                        this.blocks[3].y = this.y+2;
                        break;
                    case 1:
                        if (this.x > 7 || this.y > 18)
                            break;
                        if (
                            this.grille.tableau[this.x][this.y] !== null && this.grille.tableau[this.x][this.y].piece !== this ||
                            this.grille.tableau[this.x+1][this.y] !== null && this.grille.tableau[this.x+1][this.y].piece !== this ||
                            this.grille.tableau[this.x+2][this.y] !== null && this.grille.tableau[this.x+2][this.y].piece !== this ||
                            this.grille.tableau[this.x+1][this.y+1] !== null && this.grille.tableau[this.x+1][this.y+1].piece !== this
                        )
                            break;
                        this.direction = 2;
                        this.blocks[0].x = this.x;
                        this.blocks[0].y = this.y;
                        this.blocks[1].x = this.x+1;
                        this.blocks[1].y = this.y;
                        this.blocks[2].x = this.x+2;
                        this.blocks[2].y = this.y;
                        this.blocks[3].x = this.x+1;
                        this.blocks[3].y = this.y+1;
                        break;
                    case 2:
                        if (this.x > 8 || this.y > 17)
                            break;
                        if (
                            this.grille.tableau[this.x+1][this.y] !== null && this.grille.tableau[this.x+1][this.y].piece !== this ||
                            this.grille.tableau[this.x][this.y+1] !== null && this.grille.tableau[this.x][this.y+1].piece !== this ||
                            this.grille.tableau[this.x+1][this.y+1] !== null && this.grille.tableau[this.x+2][this.y].piece !== this ||
                            this.grille.tableau[this.x+1][this.y+2] !== null && this.grille.tableau[this.x+1][this.y+2].piece !== this
                        )
                            break;
                        this.direction = 3;
                        this.blocks[0].x = this.x+1;
                        this.blocks[0].y = this.y;
                        this.blocks[1].x = this.x;
                        this.blocks[1].y = this.y+1;
                        this.blocks[2].x = this.x+1;
                        this.blocks[2].y = this.y+1;
                        this.blocks[3].x = this.x+1;
                        this.blocks[3].y = this.y+2;
                        break;
                    case 3:
                        if (this.x > 7 || this.y > 18)
                            break;
                        if (
                            this.grille.tableau[this.x+1][this.y] !== null && this.grille.tableau[this.x+1][this.y].piece !== this ||
                            this.grille.tableau[this.x][this.y+1] !== null && this.grille.tableau[this.x][this.y+1].piece !== this ||
                            this.grille.tableau[this.x+1][this.y+1] !== null && this.grille.tableau[this.x+1][this.y+1].piece !== this ||
                            this.grille.tableau[this.x+2][this.y+1] !== null && this.grille.tableau[this.x+2][this.y+1].piece !== this
                        )
                            break
                        this.direction = 0;
                        this.blocks[0].x = this.x+1;
                        this.blocks[0].y = this.y;
                        this.blocks[1].x = this.x;
                        this.blocks[1].y = this.y+1;
                        this.blocks[2].x = this.x+1;
                        this.blocks[2].y = this.y+1;
                        this.blocks[3].x = this.x+2;
                        this.blocks[3].y = this.y+1;
                        break;
                }
        }
    }
}