using System;

namespace Domain
{
    public class Driver
    {
        public Guid id { get; set; }
        public string name { get; set; }
        public string addres1 { get; set; }
        public string addres2 { get; set; }
        public string city { get; set; }
        public string postCode { get; set; }
        public int telphone { get; set; }
    }
}