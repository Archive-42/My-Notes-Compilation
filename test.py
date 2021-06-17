
def main():

    lis=['1','f','2','3']

    # print(qu4(lis))
    print(qu2(100))



def qu1():
    for i in range(1,22):

        if i % 3 ==0 and i % 7==0:

            print('os')

        elif i % 3 ==0:

            print('open')

        elif i % 7==0:

            print('source')

        else:

            print(i)


# https://stackoverflow.com/questions/17877870/guess-the-number-game-optimization-user-creates-number-computer-guesses

def qu2(num):
    low = 1
    high = 1000000
    guess = 500000
    counter=0
    while guess != num:
        guess = (low+high)//2
        print( counter,guess)
        if guess > num:
            high = guess
        elif guess < num:
            low = guess + 1
        counter+=1
    print( guess, "..correct!")


def qu3(lis):
    
    return sum(int(x) for x in lis if x.isdigit())
    
    
def qu4(l):

        if len(l) > 0:

            if l[0].isdigit():

                return int(l[0]) +  qu4(l[1:])

            else:

                return qu4(l[1:])

        else:
            return 0


if __name__ == "__main__":
    main()
