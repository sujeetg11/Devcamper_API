#include<bits/stdc++.h>

using namespace std;

int main(){

        string s1 = "this apple is sweet";
        string s2= "this apple is sour";
        vector<string> ans;

        string s3 = s1 + " " + s2;
        vector<string> s4;

        unordered_map<string,int> mp;   

        for(int i=0;i<s3.size();i++){
            if(s3[i]==' '){
                s4.push_back(s3.substr(0,i));
                s3.erase(0,i+1);
                i=0;
            }
        }
        s4.push_back(s3);

        for(auto it:s4){
            mp[it]++;
        }

        for(auto it:mp){
            if(it.second==1){
                ans.push_back(it.first);
            }
        }

        for(auto it:ans){
            cout<<it<<" ";
        }

}