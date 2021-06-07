[To decode a string](https://stackoverflow.com/questions/50849598/how-to-return-decoded-string-based-on-encoded-string-ruby) like ‘4\[kl\]’ the output should be ‘klklklkl’.  
For s = ‘3\[k2\[b\]\]’, the output should be ‘kbbkbbkbb’.  
We can use recursion

    r = %w|4[kl] 3[k2[b]]|.map do |s|
      loop do
        break s if s.gsub!(/(\d+)\[([^\[\]]+)\]/) { $2 * $1.to_i }.nil?
      end
    end

here that String\#gsub! returns nil on no matches, terminating the whole loop.
