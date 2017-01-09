import jieba
import jieba.analyse
import sqlite3

conn = sqlite3.connect(r'C:\Users\I321338\PycharmProjects\Trendar\db.sqlite3')
cursor = conn.cursor()
jieba.analyse.set_stop_words("stop_words.txt")
f = open(r"C:\Users\I321338\PycharmProjects\Trendar\machine_learning\fashion.txt", 'rb').read()
tags = jieba.analyse.extract_tags(f, topK=15, withWeight=True)
for tag in tags:
    print("tag: %s\t\t weight: %f" % (tag[0],tag[1]))
print('=' * 40)
tags2 = jieba.analyse.textrank(f, topK=20, withWeight=True)
for tag2 in tags2:
    cursor.execute('insert into dashboard_in_elements (name,rank) values (?,?)', (tag2[0], tag2[1]))
    print("tag: %s\t\t weight: %f" % (tag2[0],tag2[1]))
cursor.execute("delete from dashboard_latest")
cursor.execute("update sqlite_sequence SET seq = 0 where name ='dashboard_latest'")
cursor.execute(" insert into dashboard_latest (date) values(datetime( 'now' , 'localtime' ) ) ")
conn.commit()